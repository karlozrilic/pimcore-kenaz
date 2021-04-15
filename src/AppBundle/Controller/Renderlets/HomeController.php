<?php


namespace AppBundle\Controller\Renderlets;


use AppBundle\Controller\BaseController;
use AppBundle\Repositories\PostRepository;
use AppBundle\Repositories\ImageGalleryThumbnailsRepository;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends BaseController
{

    /**
     * @var PostRepository
     * @var ImageGalleryThumbnailsRepository
     */
    private $postRepository;
    private $imageRepository;

    public function __construct(PostRepository $postRepository, ImageGalleryThumbnailsRepository $imageRepository)
    {
        $this->postRepository = $postRepository;
        $this->imageRepository = $imageRepository;
    }

    /**
     * @param Request $request
     */
    public function articleSliderAction(Request $request) {
        return [
            'articles' => $this->postRepository->getPosts($request->get('id'))
        ];
    }

    /**
     * @param Request $request
     */
    public function bottomImagesSliderAction(Request $request) {
        $this->view->images = $this->imageRepository->getImageGallery($request->get('id'));
    }

}