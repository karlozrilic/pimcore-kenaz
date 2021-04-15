<?php


namespace AppBundle\Controller\Renderlets;


use AppBundle\Controller\BaseController;
use AppBundle\Repositories\PostRepository;
use Symfony\Component\HttpFoundation\Request;

class PostController extends BaseController
{
    private $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function postAction(Request $request) {
        return [
            'posts' => $this->postRepository->getPosts($request->get('id'))
        ];
    }
}
