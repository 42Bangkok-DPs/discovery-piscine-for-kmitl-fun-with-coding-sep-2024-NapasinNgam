#!/bin/sh


if [ "$#" -eq 0 ]; then
    echo "No arguments supplied"
elif [ "$#" -lt 3 ] || [ "#$" == 3 ] ; then 
    for arg in "$@"; do 
       echo "$arg"
    done
elif [ "$#" -gt 3 ]; then
    echo $1;
    echo $2;
    echo $3;
fi


