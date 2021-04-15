<?php


namespace AppBundle\Controller\Renderlets;


use AppBundle\Controller\BaseController;
use AppBundle\Repositories\TagRepository;
use Symfony\Component\HttpFoundation\Request;

class TagsController extends BaseController
{
    private $tagRepository;

    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    public function tagAction(Request $request) {
        return [
            'tags' => $this->tagRepository->getTags($request->get('id')),
            'req' => $request
        ];
    }
}
