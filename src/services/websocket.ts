import { Activity } from '../components/activity/types';

class WebSocketService {
  private ws: WebSocket | null = null;
  private subscribers: ((activity: Activity) => void)[] = [];

  connect() {
    // In production, use secure WebSocket URL
    this.ws = new WebSocket('ws://localhost:8080/activities');
    
    this.ws.onmessage = (event) => {
      const activity = JSON.parse(event.data) as Activity;
      this.subscribers.forEach(callback => callback(activity));
    };

    this.ws.onclose = () => {
      // Reconnect after 5 seconds
      setTimeout(() => this.connect(), 5000);
    };
  }

  subscribe(callback: (activity: Activity) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const websocketService = new WebSocketService();