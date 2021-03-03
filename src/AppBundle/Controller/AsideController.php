<?php

namespace AppBundle\Controller;

use Pimcore\Controller\FrontendController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Pimcore\Controller\Configuration\ResponseHeader;

class AsideController extends FrontendController
{
    public function showAction(Request $request)
    {
        return ['view' => $this->view];
    }
}