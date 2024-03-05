// npm install --save  @fullcalendar/core  @fullcalendar/react  @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/list
// npm install --save @fullcalendar/interaction
// npm install --save-dev css-loader

import {useRef} from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listMonth from '@fullcalendar/list'
import interactionPlugin from "@fullcalendar/interaction"   // dateClick 

function Calendar(){
    const calendarRef = useRef();

    function eventClick(info){
        //alert(JSON.stringify(info));
        let date = new Date(info.event.start);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minute = date.getMinutes();

        // info.event.title -> 제목
        // info.el.fcSeg.eventRange.ui.constraints -> 내용

        let promise = year + '-' + month + '-' + day +'  ' + hours + ':' + minute + " " + info.event.title + " " 
            + info.el.fcSeg.eventRange.ui.constraints;
        alert(promise);
    }

    function dateClick(args){
        //alert('dateClick');
        let date = new Date(args.dateStr);
        let selectDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        alert(selectDate);
    }

    return(
        <div>
            <FullCalendar
              headerToolbar={{left: 'prev,next today', center: 'title', end:'dayGridMonth,timeGridWeek,timeGridDay,listMonth'}}
              locale={'ko'}
              navLinks={true}
              businessHours={true}
              plugins={[dayGridPlugin, timeGridPlugin,listMonth, interactionPlugin]}
              initialView='dayGridMonth'
              events={[
                {
                    title: '점심약속',
                    date: new Date()
                },
                {
                    start: '2024-03-06 12:00:00',
                    title: '미팅약속',
                    constraint: '중요비지니스',
                    display: 'background-color:',
                    color: 'red'
                },
                {
                    title: '워크샵',
                    constraint: '가평으로',
                    start: '2024-03-11 10:00:00',
                    end: '2024-03-15 16:00:00'
                }
              ]}
              eventClick={eventClick}
              ref={calendarRef}
              dateClick={dateClick}
              />
        </div>
    )
}

export default Calendar;