<?php


namespace AppBundle\Website\LinkGenerator;


use AppBundle\Website\Tool\ForceInheritance;
use AppBundle\Website\Tool\Text;
use Pimcore\Http\Request\Resolver\DocumentResolver;
use Pimcore\Localization\LocaleServiceInterface;
use Pimcore\Model\DataObject\ClassDefinition\LinkGeneratorInterface;
use Pimcore\Model\DataObject\Concrete;
use Pimcore\Model\DataObject\Tag;
use Pimcore\Model\Document;
use Pimcore\Templating\Helper\PimcoreUrl;
use Symfony\Component\HttpFoundation\RequestStack;

class TagLinkGenerator implements LinkGeneratorInterface
{
    /**
     * @var DocumentResolver
     */
    protected $documentResolver;

    /**
     * @var RequestStack
     */
    protected $requestStack;

    /**
     * @var PimcoreUrl
     */
    protected $pimcoreUrl;

    /**
     * @var LocaleServiceInterface
     */
    protected $localeService;

    /**
     * NewsLinkGenerator constructor.
     *
     * @param DocumentResolver $documentResolver
     * @param RequestStack $requestStack
     * @param PimcoreUrl $pimcoreUrl
     * @param LocaleServiceInterface $localeService
     */
    public function __construct(DocumentResolver $documentResolver,
                                RequestStack $requestStack,
                                PimcoreUrl $pimcoreUrl,
                                LocaleServiceInterface $localeService)
    {
        $this->documentResolver = $documentResolver;
        $this->requestStack = $requestStack;
        $this->pimcoreUrl = $pimcoreUrl;
        $this->localeService = $localeService;
    }

    /**
     * @param Concrete $object
     * @param array $params
     *
     * @return string
     */
    public function generate(Concrete $object, array $params = []): string
    {
        if (!($object instanceof Tag)) {
            throw new \InvalidArgumentException('Given object is not Tag');
        }

        return ForceInheritance::run(function () use ($object, $params) {
            $fullPath = '';

            if (isset($params['document']) && $params['document'] instanceof Document) {
                $document = $params['document'];
            } else {
                $document = $this->documentResolver->getDocument($this->requestStack->getCurrentRequest());
            }

            if (!$document) {
                $document = Document::getById(1);
            }

            $localeUrlPart = '/' . $this->localeService->getLocale() . '/';
            if ($document && $localeUrlPart !== $document->getFullPath()) {
                $fullPath = substr($document->getFullPath(), strlen($localeUrlPart));
            }

            if ($document && !$fullPath) {

                if ($document->getProperty('language') === 'en') {
                    $fullPath = $document->getProperty('newsDefaultDocument')->getFullPath();
                } else {
                    $fullPath = $document->getProperty('newsDefaultDocument') ? substr($document->getProperty('newsDefaultDocument')->getFullPath(), strlen($localeUrlPart)) : '';
                }
            }

            if (strpos($fullPath, '/') === 0) {
                $fullPath = substr($fullPath, 1);
            }

            return $this->pimcoreUrl->__invoke(
                [
                    'tagtitle' => Text::toUrl($object->getTitle() ? $object->getTitle() : 'tag'),
                    'tag' => $object->getId(),
                    'path' => $fullPath
                ],
                'tag-detail',
                true
            );
        });
    }
}
