
sudo mysql -u root -p
create user '아이디'@'%' identified by 'password';
'아이디'@'%' : 모든 ip주소에서 아이디 사용자로 접근 가능
'아이디'@'localhost' : 내부에서만  아이디 사용자로 접근 가능
'아이디'@'x.x.x.x' : 지정 ip 주소에서만 아이디 사용자로 접근 가능

mysqladmin -u root password password

create user 'root'@'%' identified by 'password';

grant all privileges on *.* to 'root'@'%';

flush privileges;

express?useSSL=false&allowPublicKeyRetrieval=true

인증확인

certbot certificates


sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot

