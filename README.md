# AppLab
<div id="header" align="center">
  <img src="/client/assets/imgs/logo_128p.webp" width="100"/>
</div>

## Cos'è AppLab
AppLab è un gruppo di studenti di Informatica dell’Università di Perugia che lavora alla programmazione Web rispettando gli ultimi standard W3C (HTML5, CSS3, JavaScript).

## Il nostro obiettivo
L’obiettivo è di creare siti Web responsive facilmente convertibili in App.

## Come lavoriamo
Durante gli incontri settimanali a turno alcuni studenti preparano dei tutorial sugli argomenti riguardanti il design di un sito web. Solitamente se ci sono vengono pubblicati
anche.
Il nostro lavoro si basa nella creazione senza avvalersi di framework per la crazione di siti.

## Come avviare il sito in locale
Eseguire questo comando:
`sudo docker-compose up -d`

Per vedere il log:
`sudo docker-compose logs --follow`

Per stopparlo:
`sudo docker-compose down`

## Caricare DB
Aprire phpmyadmin e  creare un database `applab`
Fare un import del file `applab.sql`

## Secret key upload page
Per caricare i tutorial c'è bisogno di una chiave, giusto per fare un minimo di sicurezza.

Secret-Key:
`{}64O#@vX^q)KF;o<QrSb"c//w#W>A`

La chiave è salvata nel database tramite sha256
