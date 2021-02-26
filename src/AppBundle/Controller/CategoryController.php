<?php


namespace AppBundle\Controller;


use AppBundle\Repositories\CategoryRepository;
use AppBundle\Website\LinkGenerator\NewsLinkGenerator;
use AppBundle\Website\LinkGenerator\TagLinkGenerator;
use Pimcore\Config\Config;
use Pimcore\Model\DataObject\Category;
use Pimcore\Model\DataObject\Tag;
use Pimcore\Templating\Helper\HeadTitle;
use Pimcore\Templating\Helper\Placeholder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class CategoryController extends BaseController
{
    const PER_PAGE_RESULTS = 10;

    private $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * @Route("{path}/{categorytitle}~c{category}", name="category-detail", defaults={"path"=""}, requirements={"path"=".*?", "categorytitle"="[\w-]+", "category"="\d+"})
     *
     * @param Request $request
     * @param HeadTitle $headTitle
     * @param Placeholder $placeholderHelper
     * @param TagLinkGenerator $tagLinkGenerator
     * @param Config $websiteConfig
     * @return array
     */
    public function show(Request $request, HeadTitle $headTitle, Placeholder $placeholderHelper, TagLinkGenerator $tagLinkGenerator, Config $websiteConfig) {
        $category = Category::getById($request->get('category'));

        if (!($category instanceof Category && ($category->isPublished() || $this->verifyPreviewRequest($request, $category)))) {
            throw new NotFoundHttpException('Category not found.');
        }

        $headTitle($category->getTitle());

        $posts = $this->categoryRepository->getCategoryPosts($category,
            $request->get('page', 1),
            $request->get('limit', $websiteConfig->get('newsPerPageResults', self::PER_PAGE_RESULTS))
        );

        return [
            'category' => $category,
            'posts' => $posts
        ];
    }
}
