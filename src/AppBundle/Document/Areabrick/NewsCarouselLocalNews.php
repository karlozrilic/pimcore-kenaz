<?php

namespace AppBundle\Document\Areabrick;

class NewsCarouselLocalNews extends AbstractAreabrick
{
    public function getName()
    {
        return 'News Carousel Local News';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
