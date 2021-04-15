<?php

namespace AppBundle\Controller;

use Pimcore\Model\DataObject;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use \Pimcore\Controller\FrontendController;


class ApiController extends FrontendController
{
    /**
     * @Route("/get-video-testemonials")
     */
    public function defaultAction(Request $request)
    {
        // do some authorization here ...

        $test = DataObject\VideoTestemonial::getById(161);
        
        $data = array(
            "description" => $test->getDescription(),
            "video" => $test->getVideo(),
            "author" => $test->getAuthor()
        );

        return $this->json(["success" => true, "data" => $data], 200);
    }
}