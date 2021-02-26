<?php


namespace AppBundle\Controller;
use AppBundle\Helpers\DateFormatter;
use Pimcore\Model\Document;
use Pimcore\Model\Document\Service;
use Pimcore\Templating\Helper\PimcoreUrl;
use Pimcore\Controller\FrontendController;
use Pimcore\Model\DataObject;
use Pimcore\Tool;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;


class BaseController extends FrontendController
{
    const JSON_STATUS_FIELD             = 'status';
    const JSON_MESSAGE_FIELD            = 'message';
    const JSON_DATA_FIELD               = 'data';
    const JSON_STATUS_ERROR             = 'error';
    const JSON_STATUS_SUCCESS           = 'success';

    public function onKernelController(FilterControllerEvent $event)
    {
        // set auto-rendering to twig
        $this->setViewAutoRender($event->getRequest(), true, 'twig');
    }

    protected function getSuccessResponse($data = null, $message = null)
    {
        $response = [
            self::JSON_STATUS_FIELD     => self::JSON_STATUS_SUCCESS,
        ];

        if ($data !== null) {
            $response[self::JSON_DATA_FIELD] = $data;
        }

        if ($message !== null) {
            $response[self::JSON_MESSAGE_FIELD] = $message;
        }

        return new JsonResponse($response, 200);
    }

    protected function getErrorResponse($message, $data = null, $statusCode = 200)
    {
        $response = [
            self::JSON_STATUS_FIELD     => self::JSON_STATUS_ERROR,
            self::JSON_MESSAGE_FIELD    => $message,
        ];

        if ($data !== null) {
            $response[self::JSON_DATA_FIELD] = $data;
        }

        return new JsonResponse($response, $statusCode);
    }

    /**
     * @param Request $request
     * @param DataObject $object
     *
     * @return bool
     */
    protected function verifyPreviewRequest(Request $request, DataObject $object): bool
    {
        if ($request->get('pimcore_object_preview') && DataObject\Service::getElementFromSession('object', $object->getId())) {
            return true;
        }

        return false;
    }

    public function prepareGallery($gallery) {
        $imageGallery = [];

        foreach ($gallery as $image) {
            $imageGallery[] = [
                'src' => $image->getThumbnail('PhotoswiperImage')->getPath(),
                'w' => $image->getThumbnail('PhotoswiperImage')->getWidth(),
                'h' => $image->getThumbnail('PhotoswiperImage')->getHeight()
            ];
        }

        return $imageGallery;
    }

    public function getTranslatableRoutes($routeName, $document, PimcoreUrl $pimcoreUrl, Service $documentService) {
        $langs = Tool::getValidLanguages();
        $lang = $this->getLanguageFromServer();

        $translations = $documentService->getTranslations($document);

        $ret = [];

        foreach ($langs as $language) {
            $doc = $document;

            if (isset($translations[$language])) {
                $doc = Document::getById($translations[$language]);
            }

            $localeUrlPart = '/' . $language . '/';
            $fullPath = $doc->getFullPath();

            $url = $pimcoreUrl->__invoke(
                [
                    'path' => $fullPath
                ],
                $routeName,
                true
            );

            $url = $this->str_replace_first("/$lang/", '', $url);

            if (!empty($_SERVER['QUERY_STRING'])) {
                $url = $url. '?' .$_SERVER['QUERY_STRING'];
            }

            $ret[$language] = $url;
        }

        return $ret;
    }

    private function str_replace_first($from, $to, $content)
    {
        $from = '/'.preg_quote($from, '/').'/';

        return preg_replace($from, $to, $content, 1);
    }

    /**
     * @return false|string
     */
    public function getLanguageFromServer() {

        try {
            $url = $_SERVER['REDIRECT_URL'];
            $lang = substr(substr($url, 0,3 ), 1, 3);

            if (!in_array($lang,  Tool::getValidLanguages())) {
                return DateFormatter::DEFAULT_LANGUAGE;
            }

            return $lang;

        } catch (\Exception $e) {
            return DateFormatter::DEFAULT_LANGUAGE;
        }
    }
}
