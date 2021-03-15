<?php


namespace AppBundle\Controller\Renderlets;


use AppBundle\Controller\BaseController;
use Pimcore\Model\Asset;
use Pimcore\Model\DataObject\VideoTestemonial;
use Symfony\Component\HttpFoundation\Request;

class VideoController extends BaseController
{

    public function videoAction(Request $request) {
        $id = $request->get('id');
        $video = Asset::getById($id);
        return [
            'video' => $video
        ];
    }

}
