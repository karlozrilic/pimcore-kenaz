<?php


namespace AppBundle\Controller\Renderlets;


use AppBundle\Controller\BaseController;
use AppBundle\Repositories\CategoryRepository;
use Symfony\Component\HttpFoundation\Request;

class CategoryController extends BaseController
{
    private $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function showAction(Request $request) {
        return [
            'categories' => $this->categoryRepository->getCategories($request->get('id'))
        ];
    }

}
