<?php

namespace AppBundle\Document\Areabrick;

class Gallery extends AbstractAreabrick
{
    public function getName()
    {
        return 'Gallery';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
