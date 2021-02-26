<?php

namespace AppBundle\Document\Areabrick;

use AppBundle\Repositories\CommentRepository;
use AppBundle\Repositories\NewsRepository;
use Pimcore\Model\DataObject\Banner;
use Pimcore\Model\Document\Tag\Area\Info;

class SidebarSocialWidget extends AbstractAreabrick
{


    public function getName()
    {
        return 'Sidebar social widget';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }

    public function action(Info $info) {
        $view = $info->getView();
        $view->facebook = 3268;
        $view->twitter = 2269;
        $view->youtube = 3528;
    }
}
