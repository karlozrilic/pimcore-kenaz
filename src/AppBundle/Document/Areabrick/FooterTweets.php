<?php

namespace AppBundle\Document\Areabrick;

class FooterTweets extends AbstractAreabrick
{
    public function getName()
    {
        return 'Footer tweets';
    }

    public function getTemplateLocation()
    {
        return static::TEMPLATE_LOCATION_GLOBAL;
    }
}
