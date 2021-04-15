<?php

namespace AppBundle\Document\Areabrick;

class ImageSlider extends AbstractAreabrick
{
    public function getName()
    {
        return 'Image slider';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
