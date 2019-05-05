import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import akka.http.scaladsl.Http

import scala.concurrent.ExecutionContext
import scala.concurrent.Await
import scala.util.{Failure, Success}

object Main extends App{
  val host = "0.0.0.0"
  val port = 9000

  implicit val system: ActorSystem = ActorSystem("Helloworld")
  implicit val materializer: ActorMaterializer = ActorMaterializer()
  implicit val executor: ExecutionContext = system.dispatcher
  // import system.dispatcher

  /*import akka.http.scaladsl.server.Directives._
  def route = path("hello"){
    get {
      complete("Hello, World!")
    }
  }*/

  val todoRepository = new InMemoryTodoRepository(Seq(
    Todo("1", "Comprar huevos", "Se acabaron los huevos, comprar una docena", false),
    Todo("2", "Comprar leche", "El gato está sediento", true)
  ))
  val router = new TodoRouter(todoRepository)
  val server = new Server(router, host, port)

  val binding = server.bind()

  //val binding = Http().bindAndHandle(route, host, port)
  binding.onComplete{
    case Success(_) => println("Success!")
    case Failure(error) => println(s"Failed: ${error.getMessage}")
  }

  import scala.concurrent.duration._
  Await.result(binding, 3.seconds)
}
