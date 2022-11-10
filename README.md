# thefirment

To run Docker:
https://buddy.works/guides/wordpress-docker-kubernetes-part-1#why-should-i-dockerize-my-wordpress-sites

Summary:

1. docker build -t 'thefirment:1.0.0' .
2. docker run --name mysql-cont -e MYSQL_ROOT_PASSWORD=qwerty -d mysql:5.7
3. docker run --name wp-cont --link mysql-cont:mysql -p 8000:80 -d thefirment:1.0.0
4. docker-compose up -d

   To stop the application, run:
   docker-compose down

   If you need to rebuild the WordPress image (eg. because you changed something in the sources), run:
   docker-compose up -d --build

5. docker build -t nkosie199/<<thefirment (image name <- docker images> )>> .
6. docker push nkosie199/thefirment

WordPress password: ah5m!j!t2Rud!GSGCk

"Unable to create directory... Is its parent directory writable by the server?":

> > > https://www.scmgalaxy.com/tutorials/wordpress-error-is-its-parent-directory-writable-by-the-server//
