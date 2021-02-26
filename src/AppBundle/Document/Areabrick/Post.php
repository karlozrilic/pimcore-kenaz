<?php

namespace AppBundle\Document\Areabrick;

class Post extends AbstractAreabrick
{
    public function getName()
    {
        return 'Post';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
