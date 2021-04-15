<?php

namespace AppBundle\Document\Areabrick;

class FooterTags extends AbstractAreabrick
{
    public function getName()
    {
        return 'Footer tags';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
