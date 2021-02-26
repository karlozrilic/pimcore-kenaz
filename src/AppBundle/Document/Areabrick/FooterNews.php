<?php

namespace AppBundle\Document\Areabrick;

class FooterNews extends AbstractAreabrick
{
    public function getName()
    {
        return 'Footer news';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
