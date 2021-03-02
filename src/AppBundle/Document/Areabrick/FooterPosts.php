<?php

namespace AppBundle\Document\Areabrick;

class FooterPosts extends AbstractAreabrick
{
    public function getName()
    {
        return 'Footer posts';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
