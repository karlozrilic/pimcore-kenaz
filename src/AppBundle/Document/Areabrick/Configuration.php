<?php

namespace AppBundle\Document\Areabrick;

class Configuration extends AbstractAreabrick
{
    public function getName()
    {
        return 'Configuration';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
