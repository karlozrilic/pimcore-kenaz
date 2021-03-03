<?php


namespace AppBundle\Controller\Renderlets;


use AppBundle\Controller\BaseController;
use AppBundle\Repositories\NewsRepository;
use AppBundle\Repositories\CategoryRepository;
use AppBundle\Repositories\PostRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class NewsController extends BaseController
{
    /**
     * @var NewsRepository
     * @var CategoryRepository
     * @var PostRepository
     */
    private $newsRepository;
    private $categoryRepository;
    private $postRepository;

    public function __construct(NewsRepository $newsRepository, CategoryRepository $categoryRepository, PostRepository $postRepository)
    {
        $this->newsRepository = $newsRepository;
        $this->categoryRepository = $categoryRepository;
        $this->postRepository = $postRepository;
    }


    /**
     * @param Request $request
     */
    public function newsAction(Request $request)
    {
        $this->view->news = $this->newsRepository->getNewsFromCategory($request->get('id'));
        $this->view->category = $this->categoryRepository->getCategoryName($request->get('id'));
    }

    /**
     * @param Request $request
     */
    public function footerNewsAction(Request $request)
    {
        $this->view->news = $this->newsRepository->getNewsFromCategory($request->get('id'), 3);
    }

    /**
     * @param Request $request
     */
    public function newsCarouselAction(Request $request)
    {
        $this->view->news = $this->newsRepository->getNewsFromCategory($request->get('id'));
    }

    /**
     * @param Request $request
     */
    public function newsCarouselSingleEditorialsAction(Request $request) {
        $this->view->news = $this->newsRepository->getNewsFromCategory($request->get('id'));
    }

    /**
     * @param Request $request
     */
    public function newsCarouselSingleLocalNewsAction(Request $request) {
        $this->view->news = $this->newsRepository->getNewsFromCategory($request->get('id'));
    }

    /**
     * @param Request $request
     */
    public function asideArticlesAction(Request $request) {
        $this->view->posts = $this->postRepository->getPosts($request->get('id'));
    }

}
