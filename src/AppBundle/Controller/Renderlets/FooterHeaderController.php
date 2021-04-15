<?php


namespace AppBundle\Controller\Renderlets;


use AppBundle\Controller\BaseController;
use AppBundle\Repositories\PostRepository;
use AppBundle\Repositories\TweetsRepository;
use AppBundle\Repositories\TagRepository;
use AppBundle\Repositories\CategoryRepository;
use Symfony\Component\HttpFoundation\Request;

class FooterHeaderController extends BaseController
{
    private $postRepository;
    private $tweetsRepository;
    private $tagRepository;
    private $categoryRepository;

    public function __construct(
        PostRepository $postRepository, 
        TweetsRepository $tweetsRepository, 
        TagRepository $tagRepository, 
        CategoryRepository $categoryRepository
        ) {
        $this->postRepository = $postRepository;
        $this->tweetsRepository = $tweetsRepository;
        $this->tagRepository = $tagRepository;
        $this->categoryRepository = $categoryRepository;
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

    public function headerCategoryAction(Request $request) {
        return [
            'categories' => $this->categoryRepository->getCategories($request->get('id')),
            'current_category_id' => explode("=", $request->server->get('REDIRECT_QUERY_STRING'))[1]
        ];
    }

}