<?php


namespace AppBundle\Controller;


use AppBundle\Repositories\CategoryRepository;
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
     * @Route("category/{categoryTitle}:id{categoryId}{page}", name="category-detail", defaults={"page"=1}, requirements={"categoryTitle"="[\w-]+", "page"="\d+"})
     *
     * @param Request $request
     * @param HeadTitle $headTitle
     * @param Config $websiteConfig
     * @return array
     */
    public function show(Request $request, HeadTitle $headTitle, Config $websiteConfig) {
        $temp = ucfirst($request->get('categoryTitle'));
        $category = Category::getById($request->get('categoryId'));

        if (!($category instanceof Category && ($category->isPublished() || $this->verifyPreviewRequest($request, $category)))) {
            throw new NotFoundHttpException('Category not found.');
        }

        $headTitle($category->getTitle());

        $posts = $this->categoryRepository->getCategoryPosts($category,
            $request->query->get('page'),
            $request->get('limit', $websiteConfig->get('newsPerPageResults', self::PER_PAGE_RESULTS))
        );

        if ($request->query->get('page') > $posts->getPageRange()) {
            throw new NotFoundHttpException('This page doesn\'t exist');
        }

        $carousellPosts = $this->categoryRepository->getCategoryPostsLimited($category);

        return [
            'category' => $category,
            'posts' => $posts,
            'carousell' => $carousellPosts
        ];
    }

    public function showAction(Request $request) {
        $category = Category::getById(4);
        $carousellPosts = $this->categoryRepository->getCategoryPostsLimited($category);
        return [
            'category' => $category,
            'posts' => $this->categoryRepository->getCategoryPosts($category, 1, 10),
            'carousell' => $carousellPosts
        ];
    }

}
