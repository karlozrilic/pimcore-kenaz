<?php


namespace AppBundle\Controller\Renderlets;


use AppBundle\Controller\BaseController;
use AppBundle\Repositories\NewsRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class NewsController extends BaseController
{
    /**
     * @var NewsRepository
     */
    private $newsRepository;

    public function __construct(NewsRepository $newsRepository)
    {
        $this->newsRepository = $newsRepository;
    }


    /**
     * @param Request $request
     */
    public function newsAction(Request $request)
    {
        $this->view->news = $this->newsRepository->getNewsFromCategory($request->get('id'));
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
}
