<?php

namespace AppBundle\Controller;

use AppBundle\Repositories\CategoryRepository;
use AppBundle\Repositories\VideoTestimonialRepository;
use Pimcore\Controller\FrontendController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Pimcore\Controller\Configuration\ResponseHeader;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AppBundle\Controller\VideoTestimonialController;

class AllVideoTestimonialsController extends FrontendController
{

    /** @var VideoTestimonialRepository $videoTestimonialRepository */
    private $videoTestimonialRepository;

    /** @var CategoryRepository $categoryRepository */
    private $categoryRepository;

    public function __construct(
        VideoTestimonialRepository $videoTestimonialRepository,
        CategoryRepository $categoryRepository
    ) {
        $this->videoTestimonialRepository = $videoTestimonialRepository;
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * @Route("/all-video-testimonials", name="all_video_testimonials")
     * @param Request $request
     * @Template()
     */
    public function showAction(Request $request)
    {
        $videoTestimonialController = new VideoTestimonialController(new VideoTestimonialRepository(), new CategoryRepository());
        $data = $videoTestimonialController->listAction($request);
        
        $this->view->videoTestimonials = $data['videoTestimonials'];
        $this->view->categoriesData = $data['categoriesData'];
        $this->view->filterCategories = $data['filterCategories'];
        $this->view->numberOfPages = $data['numberOfPages'];
        $this->view->currentPageNumber = $data['currentPageNumber'];
    }

}