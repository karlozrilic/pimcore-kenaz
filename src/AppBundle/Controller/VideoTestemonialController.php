<?php

namespace AppBundle\Controller;

use AppBundle\Repositories\VideoTestemonialRepository;
use Pimcore\Controller\FrontendController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Pimcore\Controller\Configuration\ResponseHeader;
use Pimcore\Model\DataObject\Category;
use Pimcore\Model\DataObject\VideoTestemonial;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class VideoTestemonialController extends FrontendController
{

    private $videoTestemonialRepository;

    public function __construct(VideoTestemonialRepository $videoTestemonialRepository)
    {
        $this->videoTestemonialRepository = $videoTestemonialRepository;
    }

    public function showAction(Request $request)
    {

        $isSingleCategory = $request->get('singleCategory');

        if ($isSingleCategory && !$this->editmode) {
            $categoryName = ucfirst($request->get('category'));
            $category = Category::getByPath("/Blog/Categories/{$categoryName}");
            $testemonials = $this->videoTestemonialRepository->getVideoTestemonialsByCategory($category);
            return [
                'view' => $this->view,
                'array' => $testemonials
            ];
        } else if (!$isSingleCategory && !$this->editmode) {
            $categoryList = $request->get('categoryList');
            $lst = array_map(function($categoryList) {
                return array(
                    $categoryList->getTitle()
                );
            }, $categoryList);
            $testemonials = $this->videoTestemonialRepository->getVideoTestemonialsWithCategoryArray($categoryList);
            return [
                'view' => $this->view,
                'array' => $testemonials
            ];
        }

        $allTestemonials = $this->videoTestemonialRepository->getAllVideoTestemonials();

        return [
            'view' => $this->view,
            'array' => $allTestemonials
        ];
        
    }
}