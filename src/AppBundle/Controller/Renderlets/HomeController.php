<?php


namespace AppBundle\Controller\Renderlets;


use AppBundle\Controller\BaseController;
use AppBundle\Repositories\PostRepository;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends BaseController
{
    private $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function articleSliderAction(Request $request) {
        return [
            'articles' => $this->postRepository->getPosts($request->get('id'))
        ];
    }

}