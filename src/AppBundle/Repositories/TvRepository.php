<?php


namespace AppBundle\Repositories;


class TvRepository
{

    /**
     * @return string
     */
    public function getTopVideo() {
        $videos = [
            'https://www.youtube.com/embed/2UoovdljmX8',
            'https://www.youtube.com/embed/HR1SLEPTp78'
        ];

        return $videos[array_rand($videos, 1)];
    }
}
