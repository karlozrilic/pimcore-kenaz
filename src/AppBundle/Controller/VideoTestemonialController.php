<?php

namespace AppBundle\Controller;

use Pimcore\Controller\FrontendController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Pimcore\Controller\Configuration\ResponseHeader;
use Pimcore\Model\DataObject\VideoTestemonial;

class VideoTestemonialController extends FrontendController
{

    public function showAction(Request $request)
    {

        $testemonial = VideoTestemonial::getById(161);
        $testemonial2 = VideoTestemonial::getById(162);
        $testemonial3 = VideoTestemonial::getById(163);

        return [
            'view' => $this->view,
            'video_testemonial' => $testemonial,
            'array' => array($testemonial, $testemonial2, $testemonial3)
        ];
    }
}