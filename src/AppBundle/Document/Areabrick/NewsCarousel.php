<?php

namespace AppBundle\Document\Areabrick;

class NewsCarousel extends AbstractAreabrick
{
    public function getName()
    {
        return 'News Carousel';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
