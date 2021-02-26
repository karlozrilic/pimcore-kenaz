<?php

namespace AppBundle\Document\Areabrick;

use Pimcore\Model\DataObject\Banner;
use Pimcore\Model\Document\Tag\Area\Info;

class RandomBanner extends AbstractAreabrick
{
    public function getName()
    {
        return 'Random banner';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }

    public function action(Info $info) {
        $items = new Banner\Listing();
        $items->setOrderKey("RAND()", false);
        $items->setLimit(2);

        $view = $info->getView();
        $view->banner = $items->getObjects();
    }
}
