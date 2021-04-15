<?php


namespace AppBundle\Repositories;


class TvRepository
{

    /**
     * @return string
     */
    public function getTopVideo() {
        $videos = [
            [
                'link' => 'https://www.youtube.com/embed/2UoovdljmX8',
                'title' => 'FOI - Tjedan karijera 2020 I Factory.hr',
                'date' => '2020-08-12 00:00:00'
            ], 
            [
                'link' => 'https://www.youtube.com/embed/HR1SLEPTp78',
                'title' => 'FOI - Tjedan karijera 2020 I Upoznaj Factory studente! I Factory.hr',
                'date' => '2020-08-13 00:00:00'
            ]
        ];

        return $videos[array_rand($videos, 1)];
    }
}
