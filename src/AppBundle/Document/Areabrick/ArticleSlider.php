<?php

namespace AppBundle\Document\Areabrick;

class ArticleSlider extends AbstractAreabrick
{
    public function getName()
    {
        return 'Article slider';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
