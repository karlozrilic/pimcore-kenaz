<?php


namespace AppBundle\Website\LinkGenerator;


use AppBundle\Website\Tool\ForceInheritance;
use AppBundle\Website\Tool\Text;
use Pimcore\Http\Request\Resolver\DocumentResolver;
use Pimcore\Localization\LocaleServiceInterface;
use Pimcore\Model\DataObject\ClassDefinition\LinkGeneratorInterface;
use Pimcore\Model\DataObject\Concrete;
use Pimcore\Model\DataObject\Category;
use Pimcore\Model\Document;
use Pimcore\Templating\Helper\PimcoreUrl;
use Symfony\Component\HttpFoundation\RequestStack;

class CategoryLinkGenerator implements LinkGeneratorInterface
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
        if (!($object instanceof Category)) {
            throw new \InvalidArgumentException('Given object is not Category');
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
                    $fullPath = $document->getProperty('categoryDefaultDocument')->getFullPath();
                } else {
                    $fullPath = $document->getProperty('categoryDefaultDocument') ? substr($document->getProperty('categoryDefaultDocument')->getFullPath(), strlen($localeUrlPart)) : '';
                }
            }

            if (strpos($fullPath, '/') === 0) {
                $fullPath = substr($fullPath, 1);
            }

            return $this->pimcoreUrl->__invoke(
                [
                    'categorytitle' => Text::toUrl($object->getTitle() ? $object->getTitle() : 'tag'),
                    'category' => $object->getId(),
                    'path' => $fullPath
                ],
                'category-detail',
                true
            );
        });
    }
}
