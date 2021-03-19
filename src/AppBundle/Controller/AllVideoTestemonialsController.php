<?php

namespace AppBundle\Controller;

use AppBundle\Repositories\CategoryRepository;
use AppBundle\Repositories\VideoTestemonialRepository;
use Pimcore\Controller\FrontendController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Pimcore\Controller\Configuration\ResponseHeader;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AppBundle\Controller\VideoTestemonialController;

class AllVideoTestemonialsController extends FrontendController
{

    /** @var VideoTestemonialRepository $videoTestimonialRepository */
    private $videoTestimonialRepository;

    /** @var CategoryRepository $categoryRepository */
    private $categoryRepository;

    public function __construct(
        VideoTestemonialRepository $videoTestimonialRepository,
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
        $videoTestemonialController = new VideoTestemonialController(new VideoTestemonialRepository(), new CategoryRepository());
        $data = $videoTestemonialController->listAction($request);
        
        $this->view->videoTestimonials = $data['videoTestimonials'];
        $this->view->categoriesData = $data['categoriesData'];
        $this->view->filterCategories = $data['filterCategories'];
    }

}