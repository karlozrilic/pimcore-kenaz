<?php

namespace AppBundle\Document\Areabrick;

class Newsletter extends AbstractAreabrick
{
    public function getName()
    {
        return 'Newsletter';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
