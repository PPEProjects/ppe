<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendPassword extends Mailable
{
    use Queueable, SerializesModels;
    protected $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        //
        \Illuminate\Support\Facades\Log::channel('single')->info('5', []);
        
        $this->user = $user;
        $name = config('app.name');
        $this->subject("[{$name}] Your password 新しい暗証番号 Mật khấu của bạn là");
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        \Illuminate\Support\Facades\Log::channel('single')->info('6', []);
        
        return $this->markdown('emails.SendPassword')->with(['user' => $this->user]);
    }
}
