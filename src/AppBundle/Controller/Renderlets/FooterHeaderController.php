<?php


namespace AppBundle\Controller\Renderlets;


use AppBundle\Controller\BaseController;
use AppBundle\Repositories\PostRepository;
use AppBundle\Repositories\TweetsRepository;
use AppBundle\Repositories\TagRepository;
use Symfony\Component\HttpFoundation\Request;

class FooterHeaderController extends BaseController
{
    private $postRepository;
    private $tweetsRepository;
    private $tagRepository;

    public function __construct(PostRepository $postRepository, TweetsRepository $tweetsRepository, TagRepository $tagRepository)
    {
        $this->postRepository = $postRepository;
        $this->tweetsRepository = $tweetsRepository;
        $this->tagRepository = $tagRepository;
    }

    public function footerPostAction(Request $request) {
        return [
            'posts' => $this->postRepository->getFooterPosts($request->get('id'))
        ];
    }

    public function footerTweetsAction(Request $request) {
        return [
            'tweets' => $this->tweetsRepository->getTweets($request->get('id'))
        ];
    }

    public function footerTagAction(Request $request) {
        return [
            'tags' => $this->tagRepository->getTags($request->get('id'))
        ];
    }

}