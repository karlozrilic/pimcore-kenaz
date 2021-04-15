<?php

namespace AppBundle\Document\Areabrick;

class AsideArticles extends AbstractAreabrick
{
    public function getName()
    {
        return 'Aside articles';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
