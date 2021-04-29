<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgetPassword extends Mailable
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
        $this->subject("[{$name}] New password 新しい暗証番号 Mật khấu mới");
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        \Illuminate\Support\Facades\Log::channel('single')->info('6', []);
        
        return $this->markdown('emails.ForgetPassword')->with(['user' => $this->user]);
    }
}
