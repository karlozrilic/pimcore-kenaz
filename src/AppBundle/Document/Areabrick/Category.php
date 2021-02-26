<?php

namespace AppBundle\Document\Areabrick;

class Category extends AbstractAreabrick
{
    public function getName()
    {
        return 'Category';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
