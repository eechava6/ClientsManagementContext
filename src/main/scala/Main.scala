import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import org.mongodb.scala._
import scala.concurrent.Await
import scala.util.{Failure, Success}

object Main extends App {

  val host = "0.0.0.0"
  val port = 9000

  implicit val system: ActorSystem = ActorSystem(name = "Clientes")
  implicit val materializer: ActorMaterializer = ActorMaterializer()
  import system.dispatcher

  //Start
  //val mongoClient: MongoClient = MongoClient()
  //val database: MongoDatabase = mongoClient.getDatabase("mydb")
  //val collection: MongoCollection[Document] = database.getCollection("test");
  //End

  val clientRepository = new InMemoryClientRepository(
  )
  val router = new ClientRouter(clientRepository)
  val server = new Server(router, host, port)

  val binding = server.bind()
  binding.onComplete {
    case Success(_) => println("Success!")
    case Failure(error) => println(s"Failed: ${error.getMessage}")
  }

  import scala.concurrent.duration._
  Await.result(binding, 3.seconds)
}
