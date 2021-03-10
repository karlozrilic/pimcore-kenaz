<?php

namespace AppBundle\Document\Areabrick;

class Video extends AbstractAreabrick
{
    public function getName()
    {
        return 'Video';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
