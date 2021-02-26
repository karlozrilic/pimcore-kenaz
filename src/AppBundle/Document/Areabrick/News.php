<?php

namespace AppBundle\Document\Areabrick;

class News extends AbstractAreabrick
{
    public function getName()
    {
        return 'News';
    }

    public function getDescription()
    {
        return 'News';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
