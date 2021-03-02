<?php

namespace AppBundle\Controller;

use Pimcore\Controller\FrontendController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Pimcore\Controller\Configuration\ResponseHeader;



class PovezivanjeController extends FrontendController
{
    public function showAction(Request $request)
    {
        
        $array = array("element1", "element2", "element3", "element4", "element5");
        return ['array' => $array];
    }
}