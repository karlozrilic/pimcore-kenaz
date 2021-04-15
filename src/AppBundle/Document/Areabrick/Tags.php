<?php

namespace AppBundle\Document\Areabrick;

class Tags extends AbstractAreabrick
{
    public function getName()
    {
        return 'Tags';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
