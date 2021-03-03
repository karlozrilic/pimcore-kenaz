<?php

namespace AppBundle\Document\Areabrick;

class NewsCarouselEditorials extends AbstractAreabrick
{
    public function getName()
    {
        return 'News Carousel Editorials';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
