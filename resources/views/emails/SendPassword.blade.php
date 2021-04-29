@component('mail::message')
{{--## Xin chào {{$user['name']}},--}}
## Xin chào {{$user['name']}}!
## Hello {{$user['name']}}!
## こんいちは！{{$user['name']}}
@php
    $updated_at = strtotime($user['updated_at']);
    $code = substr($updated_at, -8, 8); 
@endphp
---
### Mật khẩu của bạn là :
# {{$code}}
---
### The your password is:
# {{$code}}
---
### PPEにの新しい暗視番号は：
# {{$code}}
@endcomponent
